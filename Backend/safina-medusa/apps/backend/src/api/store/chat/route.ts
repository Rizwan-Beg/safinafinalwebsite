import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CHATBOT_MODULE } from "../../../modules/chatbot"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const chatbotService = req.scope.resolve(CHATBOT_MODULE)
  const { session_id, message, history, is_agent, customer_id, customer_name } = req.body as any

  // 1. Fetch or Create Conversation
  let conversations = await chatbotService.listConversations({
    session_id
  })
  
  let conversation = conversations[0]
  if (!conversation) {
    conversation = await chatbotService.createConversations({
      session_id,
      customer_id: customer_id || null,
      customer_name: customer_name || null,
      status: is_agent ? "agent_active" : "bot_active"
    })
  } else if (is_agent && conversation.status !== "agent_active") {
    // Force agent active if they explicitly sent from agent tab
    conversation = await chatbotService.updateConversations({
      id: conversation.id,
      status: "agent_active"
    })
  } else if (!is_agent && conversation.status === "agent_active") {
    // User switched back to bot tab — restore bot mode so AI replies again
    conversation = await chatbotService.updateConversations({
      id: conversation.id,
      status: "bot_active"
    })
  }

  // 2. Save User Message
  await chatbotService.createMessages({
    conversation_id: conversation.id,
    sender_type: "user",
    content: message,
  })

  // 3. Check Status
  if (conversation.status === "agent_active") {
    // Human is handling it, just return success
    return res.json({ 
      answer: "Message sent to agent.",
      status: "agent_active"
    })
  }

  // 4. Forward to Python Bot (Bot Active)
  try {
    const chatbotUrl = process.env.CHATBOT_URL || "http://localhost:8001";
    const pythonRes = await fetch(`${chatbotUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id,
        message,
        history
      })
    })

    if (!pythonRes.ok) {
      throw new Error("Python backend failed")
    }

    const data = await pythonRes.json()

    // 5. Save Bot Answer
    await chatbotService.createMessages({
      conversation_id: conversation.id,
      sender_type: "bot",
      content: data.answer,
    })

    return res.json(data)
  } catch (error) {
    console.error("Chatbot Error:", error)
    return res.status(500).json({ error: "Failed to connect to AI" })
  }
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  // Polling endpoint for frontend to get new messages
  const sessionId = req.query.session_id as string
  const chatbotService = req.scope.resolve(CHATBOT_MODULE)
  
  if (!sessionId) {
    return res.status(400).json({ error: "Missing session_id" })
  }

  const conversations = await chatbotService.listConversations(
    { session_id: sessionId },
    { relations: ["messages"] }
  )

  const conversation = conversations[0]
  if (!conversation) {
    return res.json({ messages: [] })
  }

  return res.json({ messages: conversation.messages })
}
