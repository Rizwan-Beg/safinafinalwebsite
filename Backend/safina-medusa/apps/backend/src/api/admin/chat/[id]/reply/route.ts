import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CHATBOT_MODULE } from "../../../../../modules/chatbot"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const chatbotService = req.scope.resolve(CHATBOT_MODULE)
  const conversationId = req.params.id
  const { message } = req.body as any

  if (!message) {
    return res.status(400).json({ error: "Message is required" })
  }

  // Ensure conversation exists
  const conversation = await chatbotService.retrieveConversation(conversationId)
  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found" })
  }

  // Ensure it's in agent mode
  if (conversation.status !== "agent_active") {
    await chatbotService.updateConversations({
      id: conversation.id,
      status: "agent_active"
    })
  }

  // Add the admin's reply
  await chatbotService.createMessages({
    conversation_id: conversation.id,
    sender_type: "human_agent",
    content: message,
  })

  return res.json({ success: true })
}
